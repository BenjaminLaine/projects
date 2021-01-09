/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstmap.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/25 04:31:12 by blaine            #+#    #+#             */
/*   Updated: 2019/11/05 23:55:13 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "./includes/libft.h"

t_list	*ft_lstmap(t_list *lst, t_list *(*f)(t_list *elem))
{
	t_list	*start;
	t_list	*move;

	if (!lst)
		return (NULL);
	move = f(lst);
	start = move;
	while (lst->next)
	{
		lst = lst->next;
		move->next = (f)(lst);
		move = move->next;
	}
	return (start);
}
