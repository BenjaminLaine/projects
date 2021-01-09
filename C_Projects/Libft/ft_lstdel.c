/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstdel.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/25 02:45:33 by blaine            #+#    #+#             */
/*   Updated: 2019/10/25 19:13:54 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	ft_lstdel(t_list **alst, void (*del)(void *, size_t))
{
	t_list **move;

	move = alst;
	while ((*move))
	{
		(del)((*move)->content, (*move)->content_size);
		free(*move);
		(*move) = (*move)->next;
	}
	(*alst) = NULL;
}
