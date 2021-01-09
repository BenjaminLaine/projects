/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstiter.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/25 04:21:43 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:51:05 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_lstiter(t_list *lst, void (*f)(t_list *elem))
{
	t_list *move;

	move = lst;
	while (move)
	{
		(f)(move);
		move = move->next;
	}
}
