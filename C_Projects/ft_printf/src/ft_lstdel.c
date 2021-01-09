/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_lstdel.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: blaine <blaine@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/10/25 02:45:33 by blaine            #+#    #+#             */
/*   Updated: 2020/01/29 18:51:14 by blaine           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_printf.h"

void	ft_lstdel(t_list **alst, void (*del)(void *, size_t))
{
	t_list **move;

	move = alst;
	while ((*move))
	{
		move = alst;
		(*alst) = (*alst)->next;
		ft_lstdelone(move, del);
		free(*move);
	}
	(*alst) = NULL;
}
